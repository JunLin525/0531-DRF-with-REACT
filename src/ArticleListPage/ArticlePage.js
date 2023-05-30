import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'
//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'


const ArticlePage = () => {
    const { ArticlePageID } = useParams()
    const navigate = useNavigate()
    const [Articles, setArticles] = useState(null)
  
    useEffect(() =>{
        let getArticles = async ()=>{
            let response = await fetch(`http://170.187.229.248:8000/articles/api/${ArticlePageID}`)
            let data = await response.json()
            setArticles(data)
        }
    
        getArticles()
        }, [ArticlePageID])

        //新增
        let creatArticles = async()=>{
            const articleData ={
                body:Articles.body,
                title:Articles.title,
                author: Articles.author
            }
            
            fetch(`http://170.187.229.248:8000/articles/api`,{
            method:"POST",
            'headers':{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Articles.body)
        })
        }

        //刪除
        let deleteArticles = async()=>{
            fetch(`http://170.187.229.248:8000/articles/api/${ArticlePageID}`,{
                method:"DELETE",
                'headers' :{
                    'Content-Type': 'application/json'
            }
        })
        navigate('/')
        }   

        //更新

        let UpdateArticles = async () => {
            try {
                await fetch(`http://170.187.229.248:8000/articles/api/${ArticlePageID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Articles)
                })
            } catch (error) {
            console.error('Error updating article:', error);
            }
        }

        let handleSubmit =async() =>{
            console.log('I want back!')
            if(ArticlePageID !== 'new' && Articles.body === ''){
                await deleteArticles()
            }   else if (ArticlePageID !== 'new'){
                await UpdateArticles()
            }   else if (ArticlePageID === 'new' && Articles.body !== null){
                await creatArticles()
            }
            navigate('/')
            console.log('I want back!')
        }


        let handleChange = (value) => {
            setArticles(prevArticle =>({...prevArticle, 'body': value}))
        }

  return (
    <div className="Articles">
      <div className="Article-header">

      <textarea onChange={(e) => { handleChange(e.target.value) }} value={Articles?.body}></textarea>
        <br></br>
        <h3>
            <Arrowleft onClick={handleSubmit}/>
        </h3>
        {ArticlePageID !== 'new'? (
            <button onClick ={deleteArticles}>Delete</button>
        ): (
            <button onClick ={handleSubmit}>Done</button>
        )}
        <button>
            <Link to="/">back to home</Link>
        </button>

        </div>

        
        

        </div>
      ) 
}



export default ArticlePage;
