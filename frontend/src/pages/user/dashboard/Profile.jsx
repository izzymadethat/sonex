import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Profile = () => {
  const redirectToStripeOnboarding = () =>
    console.log("Redirecting to stripe onboarding");

  const updateUserProfile = (e) => {
    e.preventDefault();
    console.log("Updating user profile");
  };
  return (
    <div className="items-start gap-8 my-4 space-y-8">
      <div>
        <h1 className="text-2xl">Settings</h1>
        <p className="text-lg text-muted-foreground">Your Profile Settings</p>
      </div>

      {/* Setup stripe onboarding section (if not done) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center">
            VERY IMPORTANT!!!
          </CardTitle>
          <CardDescription className="text-center">
            Please set up your stripe onboarding to start accepting payments
            from your clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Set up your onboarding account with Stripe so that you can accept
            payments from your clients!
          </p>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={redirectToStripeOnboarding}>
            Set Up Stripe Onboarding
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Profile Section */}
      <Card>
        <form onSubmit={updateUserProfile}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Provide general information about yourself. Don&apos;t forget to
              save!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your First Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>

      {/* View billing information */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center justify-between gap-y-2 md:gap-y-0 md:flex-row">
            <CardTitle>View Billing Information</CardTitle>
            <Button asChild>
              <Link to="../billing">Take Me to Billing</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Danger zone. Delete account */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center justify-between md:flex-row gap-x-5">
            <div>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription className="max-w-sm">
                Warning: Deleting your account will erase all of your
                information, including payments. This can not be undone.
              </CardDescription>
            </div>

            <Button>Delete My Account</Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Profile;

// (
//   <div className="w-full max-w-5xl mx-auto my-4 space-y-4 overflow-y-scroll">
//   <h1 className="text-3xl font-bold uppercase">Profile</h1>
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Edit Your Profile</h4>
//     </CardHeader>
//     <CardBody>
//       <form className="w-full space-y-4 ">
//         <div className="grid grid-cols-2 gap-4">
//           <Input isRequired label="First Name" placeholder="First Name" />
//           <Input isRequired label="Last Name" placeholder="Last Name" />
//         </div>
//         <Input
//           isDisabled
//           label="Username"
//           placeholder="izzy850 (cannot be changed)"
//         />
//         <Input
//           isDisabled
//           label="Email"
//           placeholder="user@email.com (cannot be changed)"
//         />
//         <Input
//           label="Old Password"
//           type="password"
//           placeholder="Old Password"
//         />
//         <Input
//           type="password"
//           label="New Password"
//           placeholder="New Password"
//         />
//         <Input
//           type="password"
//           label="Confirm Password"
//           placeholder="Confirm Password"
//         />
//         <Input
//           type="file"
//           label="Profile Picture"
//           labelPlacement="outside-left"
//           placeholder="Profile Picture"
//         />
//         <Textarea label="Bio" placeholder="Enter your bio" />
//       </form>
//     </CardBody>
//     <CardFooter>
//       <Button type="submit">Save Changes</Button>
//     </CardFooter>
//   </Card>

//   {/* Account Settings - Notifications */}
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Notifications</h4>
//     </CardHeader>
//     <CardBody>
//       <h1>Edit Your Notifications: TODO</h1>
//     </CardBody>
//     <CardFooter className="flex gap-2">
//       <Button variant="ghost" type="button">
//         Select All
//       </Button>
//       <Button type="button">Save Changes</Button>
//     </CardFooter>
//   </Card>

//   {/* Account Settings - The Danger Zone */}
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Danger Zone</h4>
//     </CardHeader>
//     <CardBody>
//       <h1>Delete Account</h1>
//       <p>
//         Are you sure you want to delete your account? This action can&apos;t
//         be undone.
//       </p>
//     </CardBody>
//     <CardFooter>
//       <p>
//         <Button type="button" color="danger">
//           Delete Account
//         </Button>
//       </p>
//     </CardFooter>
//   </Card>
// </div>
// )
