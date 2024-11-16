import { CreateComment} from "../interface/CommentsInterface";
import api from "./api";
import { UUID } from 'crypto';

const CreateUserComment = async (id: UUID ,data: CreateComment) => {
    const response = await api.post(`/comments/post/${post_id}`, data);
    return response;
  };
export{CreateUserComment}
  