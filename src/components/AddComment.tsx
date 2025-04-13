import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Comment {
    postId: number
    name: string
    email: string
    body: string
}
const addComment = async (comment: Comment) => {
    return await axios.post('https://jsonplaceholder.typicode.com/comments', comment)
}
const AddComment = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            toast.success('Comment added successfully')
            queryClient.invalidateQueries({ queryKey: ['comments', 1] });
        },
        onError: () => {
            toast.error('Failed to add comment');
          },
    })
    const handleSubmit = () => {
        
    }
  return (
    <form onSubmit={handleSubmit} >
        <Textarea
            placeholder='write a comment'
            required
            rows={3}
         />
         <Button type='submit' disabled={mutation.isPending}>
            {mutation.isPending ?  'Posting' : 'Add comment'}
         </Button>
    </form> 
  )
}

export default AddComment