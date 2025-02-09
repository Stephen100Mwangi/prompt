"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
    const { data: session } = useSession();
    const router = useRouter();
    
    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({
        prompt: '',
        tag: ''
    })

    async function createPrompt(e:React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch ('/api/prompt/new',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            setSubmitting(false)
        }
        
    }
  return (
    <Form type="Create" post={post} submitting={submitting} setPost={setPost} handleSubmit={createPrompt}></Form>
  )
}

export default CreatePrompt