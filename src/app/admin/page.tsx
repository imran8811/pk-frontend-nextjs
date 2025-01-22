'use client';
 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    if(typeof localStorage != 'undefined'){
      const adminToken = localStorage.getItem('adminToken');
      if(adminToken){
        router.push('admin/products');
      } else {
        router.push('admin/login');
      }
    }
  }, [])
  return (
    <>
    </>
  );
}