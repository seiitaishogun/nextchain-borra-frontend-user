import { checkPlatform } from '@/utils/agent';

const getRegisterPath = (): 'aos' | 'ios' | 'web' | 'mobile' => {
  const agent = checkPlatform();
  return agent === 'desktop' ? 'web' : agent;
};

export { getRegisterPath };
