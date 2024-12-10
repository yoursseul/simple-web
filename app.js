// 게시글 데이터 (하드코딩된 데이터)
//const posts = [
//  { title: "First Post", abstract: "This is the first post on this board." },
//  { title: "Second Post", abstract: "Here's a sample post to show how this works." },
//  { title: "Third Post", abstract: "You can add more posts by editing the data array in the script." }
//];

let day = 1;

// api 호출 메서드
async function fetchData() {
  try {
    // 백엔드 API에서 데이터를 가져옴
    const response = await fetch('http://localhost:8000/api/list/');  // 백엔드 API 호출
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();  // 서버에서 받은 JSON 데이터
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);  // 에러 처리
  }
}

// 게시글 렌더링 함수
async function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";  // 기존 내용 초기화

  const data = await fetchData();  // 백엔드 API에서 데이터 가져오기
  if (!data || data.length === 0) {
    container.innerHTML = '<p class="no-posts">No posts to display.</p>';
    return;
  }

  // 받은 기사 목록을 출력
  data.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    postElement.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-content">${post.description}</div>
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
