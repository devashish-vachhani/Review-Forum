import { of } from "rxjs";
import { CommentService } from "src/app/services/comment.service";
import { Comment } from 'src/app/models/comment'

const comments: Comment[] = [
    new Comment('commenter1', 'text1', new Date(), '1'),
    new Comment('commenter2', 'text2', new Date(), '2'),
];

export const CommentServiceStub = jasmine.createSpyObj<CommentService>(
    'CommentService',
    {
        getComments: of(comments),
        addComment: Promise.resolve(),
        deleteComment: Promise.resolve(),
    }
);