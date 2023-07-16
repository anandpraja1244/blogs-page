"use client";

import { FailedAlert, SuccessAlert } from "@/utils/Alert";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page({ params }) {
  const { userId } = params;
  const [form, setForm] = useState('');
  const [data, setData] = useState([])
  
  const handelButton = async (e) => {
    e.preventDefault();

    if (form?.length==0) return SuccessAlert('Comment field not be empty!!');

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({'comments':form}),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "http://localhost:3000/api/users/" + userId,
      requestOptions
    );
    const res = await response?.json();
    console.log("res>>>>>>>>>", res);

    if (res?.status == 200) SuccessAlert(res?.message);
    else return FailedAlert(res?.message);

    setForm('')
    getApiData();
  };

  const getApiData = async () => {
    const response = await fetch(
      "http://localhost:3000/api/users/" + userId
    ).then((response) => response.json());
    setData(response?.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <section class="container text-gray-600 body-font pb-12">
          
      <div class="flex flex-col text-center w-full mt-3  bg-white">
      <div class=" text-left mb-0 mt-2">
      <Link href={'/blog_home'}><button  class=" text-white bg-indigo-500 border-0 py-1 px-3 focus:outline  hover:bg-indigo-600 rounded text-sm">Go Back</button> </Link> 
      </div>
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Blog Details
        </h1>
      </div>

      <div className="m-4">
        <div class="container mx-auto flex md:flex-row flex-col items-top ">
          <div class="lg:max-w-lg lg:w-full md:w-1/2 sm:w-1/2 lg:pr-6 md:pr-66 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className="lg:w-full bg-white flex flex-col justify-center py-14 sm:px-6 lg:px-8">
              <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white  shadow sm:rounded-lg sm:px-10 max-h-md">
                  <div className="border-b border-gray py-2"> 
                    <h1>Comments.....</h1>
                    {data && data?.comments?.map((val) => {
                      return <li className="py-2">{val}</li>;
                    })}
                  </div>

                  <div class="relative mb-4">
                    <textarea onChange={(e)=>setForm(e.target.value)} value={form} id="message" placeholder="comments here..." name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                    <button onClick={handelButton} class="w-full text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>

                </div>

                </div>
              </div>
            </div>
          </div>

          <div class=" lg:flex-grow md:w-1/2 sm:w-1/2">
            <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-300 bg-white">
              <div class="container px-5 py-8 mx-auto">
                <div class="flex flex-col text-left w-full mb-20">
                  <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                    PUBLICATION DATE : {data?.publication_date}
                  </h2>
                  <h1 class="sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 ">
                    {data?.title}
                  </h1>
                  <p class=" leading-relaxed text-base">{data?.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
