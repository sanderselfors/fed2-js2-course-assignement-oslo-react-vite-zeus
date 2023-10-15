import { API_URL } from "../../lib/constants";
export default function writePosts() {
  const user_name = localStorage.getItem("user_name");
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { title, body } = form.elements;
    const req = await fetch(`${API_URL}/social/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
      }),
    });
    const data = await req.json();
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-8 pt-3 mx-auto mt-3 form-control">
        <div className="flex items-center w-full gap-2 gap-y-2 max-w-16 ">
          <div
            role="profile-pic-container"
            className="flex flex-col items-center"
          >
            <img
              src="src/assets/defaultprofilepic.png"
              className="object-cover w-24 h-24 my-2 rounded-full label-text-alt"
            />
            <h4 className=" py-0.5 px-3 text-sm font-semibold rounded-sm bg-white">
              {user_name}
            </h4>
          </div>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-end w-full max-w-md gap-y-2"
          >
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 bg-blue-100 border border-blue-300 rounded-sm input input-bordered focus:border-blue-500 focus:outline-blue-500"
            />
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="2"
              placeholder="Whats on your mind?"
              className="w-full p-2 bg-blue-100 border border-blue-300 rounded-sm input input-bordered focus:border-blue-500 focus:outline-blue-500"
            ></textarea>
            <input type="file" />
            <input
              name="media"
              id="media"
              className="w-20 max-w-sm px-3 py-1 text-white bg-blue-500 rounded-sm cursor-pointer"
              type="submit"
              value="Post"
            />
          </form>
        </div>
      </div>
    </>
  );
}
