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
import { Textarea } from "@/components/ui/textarea";
import { unloadComments } from "@/store/commentSlice";
import { unloadFiles } from "@/store/fileSlice";
import { unloadProjects } from "@/store/projectSlice";
import {
  deleteUser,
  logoutUser,
  selectUser,
  updateUser
} from "@/store/userSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(selectUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username);
      setBio(user.bio);
    }
  }, [user]);

  // set button to be disabled if no changes are made
  // not currently working
  // useEffect(() => {
  //   if (user) {
  //     if (
  //       firstName === user.firstName ||
  //       lastName === user.lastName ||
  //       bio === user.bio
  //     ) {
  //       setSaveDisabled(true);
  //     } else {
  //       setSaveDisabled(false);
  //     }
  //   }
  // }, [firstName, lastName, bio, user]);

  const redirectToStripeOnboarding = () =>
    console.log("Redirecting to stripe onboarding");

  // TODO: Add user pic in later release
  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      console.log("Updating user profile");
      const formData = {
        firstName,
        lastName,
        email,
        username,
        bio
      };
      // if (profilePicture) {
      //   profilePicture = profilePicture[0];
      // }

      dispatch(updateUser({ user: formData, id: user._id })).then(() => {
        setIsSaving(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(user._id));
      await dispatch(unloadProjects());
      await dispatch(unloadComments());
      await dispatch(unloadFiles());
      await dispatch(logoutUser());
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>First Name</Label>
                  <Input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Last Name</Label>
                  <Input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email + " (cannot be changed)"}
                    disabled
                  />
                </div>
                <div className="space-y-1">
                  <Label>Username</Label>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Bio</Label>
                <Textarea
                  placeholder="Tell us about yourself"
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {/* Profile Picture */}
              <div className="space-y-1">
                <Label>Update Profile Picture</Label>
                <Input
                  type="file"
                  placeholder="Profile Picture"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 />
                  <span>"Saving data..."</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
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

            <Button onClick={handleDeleteUser}>Delete My Account</Button>
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
