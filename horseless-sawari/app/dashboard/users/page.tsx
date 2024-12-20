'use client';
import DashboardLink from '@/components/dashboradLinks/page';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGettAllUsers from './hooks/useGettAllUsers';
import { Button } from '@/components/ui/button';
import ChangeRoleModal from '@/components/modal/changeRole-modal';

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log('🚀 ~ UserPage ~ selectedUser:', selectedUser);
  const AllUserData = useGettAllUsers();
  useEffect(() => {
    AllUserData.then((data) => setUsers(data));
  }, []);
  const handleToggleModal = (item) => {
    setSelectedUser(item);
    setOpen((prev) => !prev);
  };
  return (
    <div className='flex '>
      <div className='w-[25%]'>
        <DashboardLink />
      </div>
      <div className='sm:w-3/4 bg-theme p-[20px] gap-[50px] flex flex-col'>
        <Table className='m-[10px]'>
          <TableCaption> List of Users.</TableCaption>
          <TableHeader className='border border-black'>
            <TableRow>
              <TableHead className='w-[100px] '>S.N</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border border-black'>
            {users?.data?.AllUsers.map((item, index) => (
              <TableRow key={index} className='border border-black'>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleToggleModal(item)}>
                    Edit Role
                  </Button>
                </TableCell>
                <TableCell>
                  <ChangeRoleModal
                    handleToggleModal={handleToggleModal}
                    open={open}
                    item={selectedUser}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPage;
