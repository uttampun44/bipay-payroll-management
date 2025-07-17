import Image from "next/image";
import Login from "@assets/images/loginframe.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <section className="bg-[#F0F4FC]">
      <div className="container flex max-w-[1440px] mx-auto w-full max-h-screen h-screen">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-blue-500">Bipay</span>
          </h1>
          <p className="text-lg">
            Bipay is a payroll management platform that allows you to manage
            your payroll, employee information, and taxes all in one place.
          </p>
          <Image
            src={Login}
            alt="Login"
            width={500}
            height={500}
            quality={100}
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <div className="formField w-full">
            <form>
              <div className="inputField">
                <div className="email w-full">
                  <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="w-full"
                  />
                </div>
                <div className="password w-full my-2.5">
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full"
                  />
                </div>
              </div>
              <Button className="bg-blue-500 text-white w-full pu-2.5 rounded-md" type="submit">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
