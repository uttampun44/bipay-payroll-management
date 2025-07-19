"use client";
import Image from "next/image";
import Login from "@assets/images/loginframe.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Icon from "@/components/icon";
import { useToggle } from "@hooks/useToggle";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { account, client } from "./appwrite";

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(
      8,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

type Inputs = z.infer<typeof loginSchema>;

export default function Home() {
  const [showPassword, setShowPassword] = useToggle();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      const jwt = await account.createJWT();
      localStorage.setItem("jwt_token", jwt.jwt);
      toast.success("Successfully logged in");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <section className="bg-[#F0F4FC] py-40 min-h-[calc(100vh-5.4rem)]">
      <div className="flex-shrink-0 flex lg:flex-row max-w-[1440px] mx-auto w-full  gap-x-24">
        <div className="flex-1 flex flex-col justify-center gap-4 ">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-blue-500">BIPAY</span>
          </h1>
          <p className="text-lg">
            Bipay is a payroll management platform that allows you to manage{" "}
            <br></br>
            your payroll, employee information, and taxes all in one place.
          </p>
          <Image
            src={Login}
            alt="Login"
            width={500}
            height={500}
            quality={100}
            priority
          />
        </div>
        <div className="max-w-md w-full flex flex-col items-center justify-center gap-4 py-20">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <div className="formField w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputField space-y-4">
                <div className="email w-full">
                  <Input
                    type="text"
                    placeholder="Email"
                    className="w-full"
                    {...register("email")}
                  />
                </div>
                <div className="errors my-1.5 text-base font-normal text-red-500">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="password w-full my-2.5 relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full"
                    {...register("password")}
                  />

                  {showPassword ? (
                    <Icon
                      iconName="passwordShow"
                      className="absolute right-2 top-2"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Icon
                      iconName="passwordClose"
                      className="absolute right-2 top-2"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <div className="errors my-1.5 text-base font-normal text-red-500">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="recover flex justify-end text-base font-medium my-2.5 text-[#6C737F]">
                  <Link href="/forget-password">Forget Password?</Link>
                </div>
              </div>
              <div className="submit my-8 flex justify-center gap-x-2.5 px-1.5">
                <SignOutButton>
                  <SignInButton>
                    <Button type="button" className="w-1/2 bg-red-700">
                      <Icon iconName="github" className="w-6 h-6" />
                    </Button>
                  </SignInButton>
                </SignOutButton>
                <SignOutButton>
                  <SignUpButton>
                    <Button type="button" className="w-1/2 bg-red-700">
                      <Icon iconName="facebook" className="w-6 h-6" />
                    </Button>
                  </SignUpButton>
                </SignOutButton>
              </div>

              <div className="signin">
                <Button
                  className="bg-blue-500 text-white w-full py-2.5 rounded-md hover:bg-none"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
