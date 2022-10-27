import { AsyncStorage } from 'react-native'
import { Constants, Config } from '@common'
import wp from '@services/WPAPI';

function CommentModal() {
  if (!(this instanceof CommentModal)) {
    return new CommentModal()
  }
}

CommentModal.prototype.postCommentByPost = async function(postId,author_email,author_name,content){
  const response = await wp.comments().create({post: postId, author_email, author_name, content})
	return response
}

export default CommentModal
