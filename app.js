// 게시글 데이터 (하드코딩된 데이터)
const posts = [
  { title: "First Post", abstract: "This is the first post on this board." },
  { title: "Second Post", abstract: "Here's a sample post to show how this works." },
  { title: "Third Post", abstract: "You can add more posts by editing the data array in the script." }
];

let day = 1;
// api 호출 메서드
async function fetchData() {
  
  // day가 한자리 수 인 경우 "0"을 붙여준다
  day = day < 10 ? `0${day}`: day;
  const formattedDate = `2024-12-${day}`;
  // 마지막 부분에 API_KEY를 발급받고 입력해주세요
  const url = `https://newsapi.org/v2/everything?q=USA&from=${formattedDate}&sortBy=popularity&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // JSON 응답 처리
  } catch (error) {
    console.error("Error fetching data:", error); // 에러 처리
  }
}

// 게시글 렌더링 함수
async function renderPosts() {
  // api 호출 결과
  // const response = await fetchData();
  // const articles = response.articles;
  // articles.map( article => posts.push(article));

  const container = document.getElementById("posts-container");
  container.innerHTML = ""; // 기존 내용을 초기화
  
  if (posts.length === 0) {
    container.innerHTML = '<p class="no-posts">No posts to display.</p>';
    return;
  }
  
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    
    postElement.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-content">${post.abstract}</div>
    `;
    
    container.appendChild(postElement);
  });
}

// 버튼 클릭 시 fetchData 호출 및 게시글 렌더링
function setupButtonClick() {
  const button = document.getElementById("more");
  button.addEventListener("click", async () => {
    day++;
    await renderPosts();  // 버튼 클릭 시 renderPosts 실행
  });
}

// 페이지 로드 시 초기 게시글 표시 및 버튼 이벤트 설정
window.onload = function() {
  renderPosts();  // 페이지 로드 시 게시글 표시
  setupButtonClick();  // 버튼 클릭 이벤트 설정
};
