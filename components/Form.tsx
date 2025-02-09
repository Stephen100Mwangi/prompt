import React from 'react'
import Link from 'next/link';

type  PostProp = {
  prompt: string,
  tag: string
}

type FormProps = {
  type: string;
  post: PostProp;
  submitting: boolean;
  setPost: React.Dispatch<React.SetStateAction<PostProp>>;
  handleSubmit: (e:React.FormEvent) => Promise<void>;
}

const Form: React.FC<FormProps> = ({type, post, submitting, setPost, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{type}</span> Post</h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-Powered platform.
      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-grey-700 text-base'>Your AI Prompt</span>
          <textarea value={post.prompt} onChange={(e)=> setPost({...post, prompt: e.target.value})} required placeholder='Write your prompt here...' className='form_textarea'></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-grey-700 text-base'>Tag {' '} <span className='font-normal'>(#product, #webdevelopment, #idea)</span></span>
          <input value={post.tag} onChange={(e)=> setPost({...post, tag: e.target.value})} required placeholder='#tag' className='form_input'></input>
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href={"/"} className='text-grey-500 text-sm'>Cancel</Link>
            <button type="submit" disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>{submitting ? `${type}...`:type}</button>
        </div>
      </form>
    </section>
  )
}

export default Form