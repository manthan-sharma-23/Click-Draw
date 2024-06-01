import { useGetCreatedTasks } from "../../lib/hooks/useGetCreatedTasks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../lib/styles/scroll.css";

const Analytics = () => {
  const { tasks, loading } = useGetCreatedTasks();

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }
  return (
    <div className=" h-full w-full p-3 pl-8 flex flex-col items-start justify-start">
      <p className="w-full font-poppins underline text-2xl font-semibold">
        Created Tasks
      </p>
      <div className="h-full w-full mt-3 overflow-y-scroll custom-scrollbar">
        {tasks &&
          tasks.map((task) => (
            <div className="my-2 p-2 px-4 cursor-pointer hover:bg-white/5 transition-all w-full h-[35vh] border border-white/30">
              <div className="flex justify-between ">
                <p className="text-2xl tracking-wide font-semibold text-white/70">
                  {task.title}
                </p>
                <p className="text-xl tracking-wide font-normal text-white/50">
                  Funds: {task.funds} lamports
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xl tracking-wide font-semibold text-white/40">
                  {task.description}
                </p>
                <p className="text-xl tracking-wide font-normal text-white/50">
                  Workers: {task.worker}
                </p>
              </div>
              <div className="mt-4">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  loop={true}
                  className="overflow-x-scroll custom-scrollbar"
                >
                  {task.options.map((option, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={option.image_url}
                        className="h-[12rem] w-[18rem] object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Analytics;
