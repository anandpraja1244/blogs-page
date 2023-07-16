"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { FailedAlert, SuccessAlert } from "@/utils/Alert";
import Link from "next/link";
import "../globals.css";

export default function page() {
  // const [posts, setPosts] = useState([]);
  const pageSize = 3;
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log("pageNo", pageNo);
  const [nameForm, setNameForm] = useState({
    title: "",
    content: " ",
    summary: " ",
    publication_date: moment(new Date()).format("DD/MM/YYYY"),
  });

  const handelForm = (e) => {
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });
  };

  const handelButton = async (e) => {
    e.preventDefault();
    console.log("first=================>nameForm", nameForm);
    // ================post data===============
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(nameForm),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "http://localhost:3000/api/users",
      requestOptions
    );
    const res = await response?.json();

    if (res?.status == 200) SuccessAlert(res?.message);
    else return FailedAlert(res?.message);

    getApiData();
  };

  // ================get data===============
  const getApiData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/users").then(
      (response) => response.json()
    );
    setData(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    let rowData = [...data];
    const fData = rowData.slice(pageNo * pageSize - pageSize, pageNo * pageSize)
    setCurrentPageData(fData);
  }, [data, pageNo]);

  return (
    <section class="container text-gray-600 body-font pb-12">
      <div class="flex flex-col text-center w-full mt-3  bg-white">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          BLOG FORM
        </h1>
      </div>
      <div className="m-4">
        <div class="container mx-auto flex md:flex-row flex-col items-top ">
          <div class="lg:max-w-lg lg:w-full px-2 md:w-1/2 sm:w-1/2 lg:pr-6 md:pr-66 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className="lg:w-full bg-white flex flex-col justify-center py-14 sm:px-12 sm:p-3 lg:px-8">
              <div className=" sm:mx-auto sm:w-full  sm:max-w-md">
                <div className="bg-white  shadow sm:rounded-lg sm:px-10 p-4">
                  <form
                    className="space-y-6 py-4"
                    onSubmit={handelButton}
                    action="#"
                    method="POST"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          id="title"
                          type="title"
                          autoComplete="title"
                          name="title"
                          value={nameForm.title}
                          onChange={handelForm}
                          required
                          className="newPadde_22 appearance-none block w-full sm:p-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Content
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="content"
                          type="content"
                          name="content"
                          value={nameForm.content}
                          onChange={handelForm}
                          autoComplete="content"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Summary
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="summary"
                          name="summary"
                          value={nameForm.summary}
                          onChange={handelForm}
                          type="text"
                          autoComplete="summary"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {loading &&(
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
          
            <div class=" lg:flex-grow md:w-1/2 sm:w-1/2">
              <div className="grid grid-cols-1 gap-4 ">
                {currentPageData?.map((item) => (
                  <div
                    key={item._id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    {/* <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={item.imageUrl} alt="" />
          </div> */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={"/blog_form/" + item._id}
                        className="focus:outline-none"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <h1 className="text-gray-900 title-font font-medium">
                          {item?.title}
                        </h1>
                        <p className="l mx-auto leading-relaxed text-base truncate ...">
                          {item?.content}
                        </p>
                        <p className="text-sm text-gray-800 truncate">
                          {item?.publication_date}
                        </p>

                        <span class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                          Learn More
                          <svg
                            class="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 justify-between ">
                  <button
                    disabled={pageNo == 1}
                    onClick={() => setpageNo(pageNo-1)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                   onClick={() => setpageNo(pageNo+1)}
                    disabled={data?.length / pageSize == pageNo}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
