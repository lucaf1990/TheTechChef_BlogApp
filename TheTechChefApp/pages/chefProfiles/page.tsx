"use client";
import { useEffect, useState } from "react";
import { User } from "../../components/interfaces/interfaces";
import Loading from "../../components/isLoading/Loading";
import { useRouter } from "next/router";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/recipe/author/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTYyMzUyNSwiZXhwIjoxNjg2MjI4MzI1fQ.SOIX_Bj2mD1RCecatL7rt0y6GgJ5ctMC3izO-NhcMsoDa_zzDEiNWHKh4oBIjzTc`,
          },
        });

        if (res.ok) {
          const userProfileData: User = await res.json();
          setUserProfile(userProfileData);
          console.log(userProfileData);
        } else {
          console.log("Error: Unable to fetch user profile");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (!userProfile) {
    return <Loading />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userProfile.name}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>Date of Birth: {userProfile.dayOfBirth}</p>
      {/* Display other profile information */}
    </div>
  );
}
