const apikey = '6ad04b103f114804a21f9faaa2c2b569';

const blogContainer = document.getElementById("blog-container");
const searchFeild = document.getElementById("search-input")
const searchButton= document.getElementById("search-button")


async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error)
        return []
    }
}

searchButton.addEventListener("click",async ()=>{
    const query = searchFeild.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch(error){
            console.log("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error)
        return []
    }
}
function displayBlogs(articles){
    blogContainer.innerHTML = ""
    articles.forEach((article) =>{
        const blogCard = document.createElement("div")
        blogCard.classList.add('blog-card')
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
       const TruncatedTitle = article.title.length >30 ? article.title.slice(0,30) + "..." :article.title;
       title.textContent = TruncatedTitle;
        const description = document.createElement("p")
        const TruncatedDes = article.description.length >120 ? article.description.slice(0,120) + "..." :article.description;
        description.textContent = TruncatedDes

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click',()=>{
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    })
}

(async ()=>{
    try{
       const articles = await  fetchRandomNews();
       displayBlogs(articles);
    } catch(error){
        console.error("Error fetching random news",error);
    }
})();