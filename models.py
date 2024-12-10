# news_board/models.py
from django.db import models
import datetime

class News(models.Model):
    title = models.CharField(max_length=255)  # 뉴스 제목
    description = models.TextField(null=True, blank=True)  # 뉴스 설명 (Optional)
    url = models.URLField(default='http://example.com')  # URL 필드 (옵션으로 사용)
    published_at = models.DateTimeField(default=datetime.datetime.now)  # 게시 날짜
    author = models.CharField(max_length=255, null=True, blank=True)  # 작성자 (Optional)
    content = models.TextField(null=True, blank=True)  # 본문 내용 (Optional)

    def __str__(self):
        return self.title
