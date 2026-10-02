/**
 * useCurrentUser — reads the active Supabase session.
 * No localStorage involved. Returns user metadata from Supabase directly.
 */
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase.js";

export function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    // Load current session once
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Keep in sync on auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const meta = user?.user_metadata ?? {};

  return {
    user,
    fullName:  meta.full_name   || user?.email || "Farmer",
    firstName: (meta.full_name  || user?.email || "Farmer").split(" ")[0],
    farmerId:  meta.farmer_id   || user?.id    || "",
    district:  meta.district    || "",
    landAcres: meta.total_land_acres != null ? String(meta.total_land_acres) : "5.0",
    email:     user?.email      || "",
    isLoggedIn: !!user,
  };
}
