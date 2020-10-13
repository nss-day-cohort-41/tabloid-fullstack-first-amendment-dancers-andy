import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button, CardTitle, CardSubtitle } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";


const PostDetail = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();


    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    if (!post) {
        return null;
    }


    //convert publication date to MM / DD / YYYY

    const publishDate = new Date(post.publishDateTime)
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <Card className="m-4">
            <CardBody>
            <h2>{post.title}</h2>
            <CardSubtitle>By {post.userProfile.displayName}</CardSubtitle>
            </CardBody>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <Link to={`/posts/${post.id}/comments`}><Button className="postCommentButton" style={{margin: 10}}
                >Comments</Button></Link>

                <Button type="button"
                        style={{margin: 10}}
                    onClick={() => { history.push(`/posts/`) }}>
                    Post List
                </Button>


                
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="danger"
                style={{margin: 10}}
                
                onClick={() => { history.push(`/posts/delete/${postId}`) }}>
                        Delete
                         
                </Button >}
                {JSON.parse(sessionStorage.getItem("userProfile")).id === post.userProfileId && <Button color="info"
                style={{margin: 10}}
                
                onClick={() => { history.push(`/posts/edit/${postId}`) }}>
                        Edit
                         
                </Button >}
                
            </CardBody >
        </Card >
    );
};


export default PostDetail;