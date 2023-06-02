"use client";
import { useEffect, useState } from "react";
import { RecipeDTO, User } from "components/interfaces/interfaces";
import Loading from "components/isLoading/Loading";
import { useRouter } from "next/router";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<RecipeDTO[] | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/recipe/author/${1}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTYyMzUyNSwiZXhwIjoxNjg2MjI4MzI1fQ.SOIX_Bj2mD1RCecatL7rt0y6GgJ5ctMC3izO-NhcMsoDa_zzDEiNWHKh4oBIjzTc`,
          },
        });

        if (res.ok) {
          const userProfileData: RecipeDTO[] = await res.json();
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
  }, []);

  if (!userProfile) {
    return <Loading />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile.map((user, index) => {
        return (
          <>
            <div>
              <p>{user.author.name}</p>
              <p>{user.author.lastName}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
