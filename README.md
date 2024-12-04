
## 1. 프로젝트 설명

해당 프로젝트는 프로젝트를 위해 간단하게 구성한 클라이언트 템플릿입니다. 프로젝트는 html, css, js 로만 구성되어져 있습니다.
프로젝트를 실행하기 위해선 아래의 방법을 따라야 합니다.


a. npm install 
<br/>
b. npm start 
<br/>
위 과정을 진행한 이후 더미 데이터가 입력된 게시판을 확인할 수 있습니다.
<br/>
<br/>

c. API Key 발급 => https://newsapi.org/register
<br/>
API Key를 발급 받고 17번째줄의 API_KEY 자리에 값을 넣어주세요.
<br/>
<br/>

d. 라인 32 ~ 34 의 주석을 풀어주세요
<br/>
위 과정을 끝낸다면 API를 통해 기사를 받아오는 기능이 구현된 게시판을 볼 수 있습니다.
이후 다음 과정을 진행해주세요.
<br/>
<br/>

e. 백엔드 API 서버 구축 <br/>
간단한 API 서버를 구축하고 현재 클라이언트에서 이용하는 API 호출을 서버에서 진행하고 
AI를 통해 데이터를 처리해 주세요. <br/>
그리고 처리된 데이터 값을 RDS에 저장하고 이를 클라이언트로 반환해 주세요.
<br/>
api를 통해 받아온 데이터는 아래와 같습니다.
<br/>
{
    "source": {
        "id": "",
        "name": ""
    },
    <br/>
    "author": "",
    <br/>
    "title": "",
    <br/>
    "description": "",
    <br/>
    "url": "",
    <br/>
    "urlToImage": "",
    <br/>
    "publishedAt": "",
    <br/>
    "content": ""
    <br/>
}
<br/>
이중 source, author, description, content를 이용해 abstract 데이터를 생성해주세요.
<br/>
그리고 title, abstract 값을 RDS에 저장해주세요.
<br/>
<br/>

f. RDS 연결
<br/>
이때 하나의 테이블을 생성해주고 이 테이블은 title, abstract 두가지 칼럼을 지닙니다.
<br/>
<br/>

## 2. 완성된 데이터 플로우

클라이언트의 get 요청 => 백엔드 API 서버의 get 요청 => newsapi에서 데이터 백엔드로 데이터 리턴 =>  백엔드에서 데이터를 ai로 전달 => ai 요약 작업진행 후 백엔드로 결과값 리턴 => 백엔드에서 클라이언트와 RDS로 데이터 전달 => 클라이언트에서 데이터 display, RDS에서는 데이터 저장
