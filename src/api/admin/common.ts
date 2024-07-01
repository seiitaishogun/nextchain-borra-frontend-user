import { adminInstance } from '@/utils/axios';

const fetchTags = async () => {
  const { data } = await adminInstance.get(`/common/tags`);
  return data;
};

const fetchTypes = async () => {
  const { data } = await adminInstance.get(`/common/types`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await adminInstance.get(`/common/categories`);
  return data;
};

const fetchTemplates = async () => {
  const { data } = await adminInstance.get(`/common/templates`);
  return data;
};

const fetchConditions = async () => {
  const { data } = await adminInstance.get(`/common/conditions`);
  return data;
};

export {
  fetchTags,
  fetchTypes,
  fetchCategories,
  fetchTemplates,
  fetchConditions,
};
