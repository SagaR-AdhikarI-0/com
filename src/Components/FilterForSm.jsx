import React,{useState} from 'react'
import ReactDom from 'react-dom'
import { useForm } from 'react-hook-form';
import CheckIcon from "@mui/icons-material/Check"; 
import { toast } from 'react-toastify';

function FilterForSm({setbtnClicked,handleClick,onCLose,firebaseProducts,searchItems,setSearchItems}) {
    const[priceRange,setPriceRange]=useState(0)

    const [isColorClicked, setIsColorClicked] = useState(null);
    const [sizeClicked, setSizeClicked] = useState(null);

    const{register,setValue,handleSubmit}=useForm()


    const catagory = [
        { title: "Electronics" },
        { title: "Jewelery" },
        { title: "Men's clothing" },
        { title: "Women's clothing" },
      ];
      

      const colors = [
        { bg:"red-600",color:'red'},
        { bg:"green-600",color:'green'},
       { bg: "blue-600",color:'blue'},
        {bg: "black",color:'black'},
        {bg: "white",color:'white'},
        {bg: "orange-600",color:'white'},
       ];

       const handlePriceRangeChange = (e) => {
        const price = e.target.value;
        setPriceRange(price);
      };
    
      //Closing the Modal for sm
      const handleClose = () => {
        setISFilterActiveForSm(false);
        document.body.style.overflow = "auto";
      };
    
      //handeling the Color Click
      const handleColorClick = (color) => {
        if (isColorClicked === color) {
          setIsColorClicked(null);
        } else {
          setIsColorClicked(color);
          setValue("selectedColor", color);
        }
      };
    
      const handleSizeClick = (size) => {
        if (sizeClicked === size) {
          setSizeClicked(null);
        } else {
          setSizeClicked(size);
          setValue("selectedSize", size);
        }
      };
    






       const handelApplyFilter = (data,e) => {
        e.preventDefault()
        console.log(data);
        const pricetoFilter=data.priceRange<50?priceRange*50:priceRange*200
        console.log(pricetoFilter)
        const filteredItems = firebaseProducts.filter((item) => {
          return(
          item.price < pricetoFilter &&
          (item.description.toLowerCase().includes(data.selectedColor?.toLowerCase()) ||
          item.description.toLowerCase().includes(data.selectedSize?.toLowerCase()) ||
          item.name.toLowerCase().includes(data.selectedColor?.toLowerCase()) ||
          item.name.toLowerCase().includes(data.selectedSize?.toLowerCase())))
      });
      console.log(filteredItems)
        setSearchItems(filteredItems)
      };




      const size = ["Large", "Small", "Medium", "XX-Large", "4-XL", "X-small"];
  return ReactDom.createPortal(  
  

<div className=" shadow-2xl  shadow-black  ml-auto p-6 absolute overflow-y-auto top-0 z-50 h-screen bg-white right-0 bottom-0  w-[80vw]  border-[#efefef] border-2 rounded-2xl ">
             <form  onSubmit={handleSubmit(handelApplyFilter)}>
            <div className="text-left  flex flex-col text-lg  ">
              <label className="text-left font-bold text-2xl">
                Select Catogory:
              </label>

              <hr className="mt-3" />

              <button
                className="text-left m-2 hover:underline"
                onClick={() =>  setbtnClicked(false)}
              >
                All
              </button>

              {catagory.map((cato) => (
                <button
                  className="text-left m-2 hover:underline"
                  key={cato.title}
                  onClick={() => handleClick(cato.title.toLocaleLowerCase())}
                >
                  {cato.title}
                </button>
              ))}
            </div>
            <div className='border-2  p-4'>
           
            <div className="my-3">
              <div className="text-left text-2xl font-bold">Price</div>
              <input
                  type="range"
                  minLength={0}
                  maxLength={100}
                  value={priceRange}
                  {...register("PriceRange")}
                  onChange={handlePriceRangeChange}
                />
              <h1 className="font-bold text-xl text-left px-4 "> Rs.0 - Rs.{priceRange<50?priceRange*50:priceRange*200} </h1>
            </div>

            <hr className="mt-4" />
            {/* color section */}
            <div className="text-2xl font-bold text-left mt-2">
              Colors
              <div className="grid grid-cols-3  gap-4 my-2">
                {colors.map((color) => (
                  <div
                    key={color.bg}
                    onClick={() => handleColorClick(color.color)}
                    className={`rounded-[50%] w-10 h-10 bg-${color.bg} border border-gray-500`}
                  >
                         {isColorClicked === color.color && (
                          <CheckIcon
                            fontSize="large"
                            className="text-amber-200"
                          />
                        )}
                  </div>
                ))}
              </div>
            </div>

            <hr />
            <div className="text-left font-bold text-2xl my-2">
              Size
              <div className="grid grid-cols-2 gap-5 mt-2">
                {size.map((size) => (
                  <button  key={size} className={`bg-slate-100 ${
                    sizeClicked === size ? "bg-slate-400" : null} rounded-2xl font-normal text-sm  py-2`} onClick={() => handleSizeClick(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
           <hr className='my-3' />
        <div className=' flex bg-white items-center mt-4 justify-evenly '>
            <button className='p-3 px-8 bg-black  rounded-lg text-white' onClick={onCLose}>CLose</button>
            <button className=' p-3  px-2 bg-red-800 rounded-lg  text-white' type='submit' onClick={()=>toast.success("Filter Applied")}>Apply filter</button>
            </div>
            </div>
            </form>
          </div>
         
  
  ,document.querySelector("#modal"))
}

export default FilterForSm