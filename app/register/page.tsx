"use client";
import Image from "next/image";
import Login from "@assets/images/loginframe.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToggle } from "../hooks/useToggle";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { account, ID } from "../appwrite";
import { toast } from "sonner";

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
  confirmPassword: z
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

export default function Register() {
  const [showPassword, setShowPassword] = useToggle();
  const [confirmPassword, setConfirmPassword] = useToggle();

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: Inputs) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.confirmPassword
      );
      router.push("/register");
      toast.success("Account created successfully");
    } catch (error) {}
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
          <h1 className="text-4xl font-bold">Register</h1>
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

                <div className="confirmPassword w-full my-2.5 relative">
                  <Input
                    type={confirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full"
                    {...register("confirmPassword")}
                  />

                  {confirmPassword ? (
                    <Icon
                      iconName="passwordShow"
                      className="absolute right-2 top-2"
                      onClick={() => setConfirmPassword(false)}
                    />
                  ) : (
                    <Icon
                      iconName="passwordClose"
                      className="absolute right-2 top-2"
                      onClick={() => setConfirmPassword(true)}
                    />
                  )}
                </div>
                <div className="errors my-1.5 text-base font-normal text-red-500">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>

              <div className="submit my-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2.5 rounded-md hover:bg-none"
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
