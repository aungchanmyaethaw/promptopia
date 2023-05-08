"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

type ProviderRecord = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

export default function Nav() {
  const { data: session }: any = useSession();

  const [providers, setProviders] = useState<ProviderRecord | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const handleProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    handleProvider();
  }, []);

  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* desktop */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href={`/profile?userid=${session?.user?.id}&username=My`}>
              <Image
                src={session?.user?.image || ""}
                className="rounded-full"
                width="37"
                height="37"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers
              ? Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))
              : null}
          </>
        )}
      </div>
      {/* mobile */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || ""}
              className="rounded-full"
              width="37"
              height="37"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown ? (
              <div className="dropdown">
                <Link
                  href={`/profile?userid=${session?.user?.id}&username=My`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="w-full mt-5 black_btn"
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
