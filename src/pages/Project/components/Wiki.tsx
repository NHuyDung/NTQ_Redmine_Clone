import React from "react";
import { Link } from "react-router-dom";
import images from "~/assets/img";

const Wiki = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5 ">
        <h2 className="text-xl text-[#555] font-medium">Wiki</h2>
        <div className="flex items-center gap-1 text-11">
          <Link
            to="/projects/fresher-_-reactjs-fresher/wiki/Wiki/edit"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <img src={images.edit} alt="edit" />
            <span>Edit</span>
          </Link>
          <Link
            to="/watchers/watch?object_id=112&amp;object_type=wiki_page"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <img src={images.favowiki} alt="favowiki" />
            <span>Watch</span>
          </Link>
          <Link
            to="/projects/fresher-_-reactjs-fresher/wiki/Wiki"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <img src={images.remove} alt="remove" />
            <span>Delete</span>
          </Link>
          <Link
            to="/projects/fresher-_-reactjs-fresher/wiki/Wiki/history"
            className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]"
          >
            <img src={images.history} alt="history" />
            <span>History</span>
          </Link>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-1 text-xs">
          <Link className="flex item-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]" to="/attachments/download/43934/12345.jpg">
            <img src={images.attachment} alt="attachment" />
            <span>12345.jpg</span>
          </Link>
          <span className="">(47.6 KB)</span>
          <Link to="/attachments/43934/12345.jpg" className="w-4" rel="attachments" title="12345.jpg">
            <img src={images.preview} alt="preview" />
          </Link>
          <span className="text-[#888]">Dung Nguyen Van 6 (Internship), 07/15/2024 02:04 PM</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Link className="flex item-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]" to="/attachments/download/43934/12345.jpg">
            <img src={images.attachment} alt="attachment" />
            <span>ui-icons.png</span>
          </Link>
          <span className="">- sssss (4.44 KB)</span>
          <Link to="/attachments/43934/12345.jpg" className="w-4" rel="attachments" title="12345.jpg">
            <img src={images.preview} alt="preview" />
          </Link>
          <span className="text-[#888]">Son (internship) Nguyen Hoang Huu, 07/29/2024 09:41 AM</span>
        </div>

        <div className="flex items-center gap-1 w-fit m-2.5 p-1.5 border border-[#ccc]">
          <Link to="/attachments/43934/12345.jpg" className="" rel="thumbnails" title="12345.jpg">
            <img alt="12345" src={images.imgwiki} width="180" />
          </Link>
          <Link to="/attachments/43996/ui-icons.png" className="" rel="thumbnails" title="ui-icons.png-sssss">
            <img alt="Ui-icons" src={images.iconswiki} width="180" />
          </Link>
        </div>

        <Link
          className="flex item-center gap-1 my-3 text-xs text-[#169] hover:underline hover:text-[#b2290f]"
          to="/projects/fresher-_-reactjs-fresher/wiki"
        >
          New file
        </Link>
      </div>
    </div>
  );
};

export default Wiki;
