# news_board/views.py
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import News

API_KEY = 'ff08e78180094e1cb855ef39a58cef58'  # 발급받은 API 키

# 외부 뉴스 API에서 데이터를 받아와 DB에 저장하는 뷰
@api_view(['GET'])
def fetch_news(request):
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={API_KEY}'
    response = requests.get(url)

    if response.status_code == 200:
        articles = response.json().get('articles', [])
        for article in articles:
            title = article.get('title')
            author = article.get('author')
            description = article.get('description')
            content = article.get('content')
            
            # DB에 저장
            News.objects.create(
                title=title,
                author=author,
                description=description,
                content=content
            )
        return JsonResponse({'message': 'News data fetched and saved successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Failed to fetch news'}, status=400)


# DB에서 데이터를 조회하여 클라이언트로 반환하는 뷰
@api_view(['GET'])
def get_news(request):
    # DB에서 저장된 뉴스 데이터 조회
    news = News.objects.all().values('title', 'author', 'description', 'content')
    return JsonResponse(list(news), safe=False)
