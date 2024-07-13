import { useEffect, useState } from "react";
import { authService } from "../firebase/fbInstance";
import { User } from "firebase/auth";

interface UserType {
  displayName?: string;
  email?: string;
  uid?: string;
}

export default function useUserInfo() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(
      (currentUser: User | null) => {
        if (currentUser) {
          const userInfo: UserType = {
            displayName: currentUser.displayName || undefined,
            email: currentUser.email || undefined,
            uid: currentUser.uid,
          };
          setUser(userInfo);
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User info updated:", user?.displayName);
  }, [user]);

  return user;
}
