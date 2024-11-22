import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FolderUp,
  MessagesSquare,
  Lock,
  MessageCircleQuestion
} from "lucide-react";

const WhatsIncluded = () => {
  return (
    <section className="py-12" id="whats-included">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto lg:text-center">
          <h2 className="px-3 mb-4 text-base font-semibold leading-7 uppercase transition-transform duration-300 rounded-lg cursor-default text-background bg-primary lg:mb-8 hover:scale-105">
            Key Features
          </h2>
          <h2 className="text-4xl font-bold text-center lg:text-7xl md:text-5xl tracking-">
            Built For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-transparent">
              Audio Professionals
            </span>
          </h2>
          <p className="max-w-2xl mt-6 text-center text-md">
            Sonex helps audio professionals work with their clients with ease.
            We have a list of growing features built into our platform to help
            you organize your audio projects, communicate with clients, and
            handle payments.
          </p>
        </div>
        <ScrollArea className="h-[400px] mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary">
                <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                  <FolderUp className="w-6 h-6 text-background" />
                </div>
                Quick & Easy Client Uploads
              </dt>
              <dd className="mt-2 text-base leading-7 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tenetur atque, ipsam reiciendis earum nemo officia dolores
                dolorum fugit, impedit maxime eaque, et quo repellendus a
                officiis sunt explicabo. Molestias, dicta!
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary">
                <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                  <MessagesSquare className="w-6 h-6 text-background" />
                </div>
                Timestamped Comments
              </dt>
              <dd className="mt-2 text-base leading-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                pariatur velit quis, veritatis aliquam obcaecati facere dolorum
                corporis error necessitatibus aspernatur animi quae cum rerum
                libero rem, quia saepe qui.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary">
                <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                  <Lock className="w-6 h-6 text-background" />
                </div>
                Secured Downloads
              </dt>
              <dd className="mt-2 text-base leading-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                adipisci cupiditate debitis provident unde modi quo numquam ex
                cumque quia. Suscipit eum harum minus rerum quos. Nemo nostrum
                quis ullam!
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary">
                <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                  <MessageCircleQuestion className="w-6 h-6 text-background" />
                </div>
                24/7 Customer Support
              </dt>
              <dd className="mt-2 text-base leading-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                nam aliquam aspernatur? Aliquid deserunt perferendis suscipit
                mollitia laboriosam recusandae voluptas ipsum, ullam autem quia
                dolor, sint quod nobis accusamus itaque.
              </dd>
            </div>
          </dl>
        </ScrollArea>
      </div>
    </section>
  );
};

export default WhatsIncluded;

// const whatsIncluded = (

// )
