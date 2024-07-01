import useUser from '@/hooks/auth/useUser';

function useUpdateUserInfo() {
  const { mutate } = useUser();

  const handleUpdateUserInfo = () => {
    mutate();
  };

  return {
    handleUpdateUserInfo,
  };
}

export default useUpdateUserInfo;
