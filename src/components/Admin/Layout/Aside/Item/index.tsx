import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export interface Props {
  data: Menu;
}

export interface Menu {
  id: number;
  text: string;
  link?: string;
  submenu?: Array<Menu>;
}

const Layout = styled.div`
  > div {
    padding-left: 20px;
  }
`;

function Item({ data }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { id, text, link, submenu } = data;

  if (submenu) {
    return (
      <Layout>
        <ListItemButton key={id} onClick={() => setIsOpen(!isOpen)}>
          <ListItemIcon>
            <CreateNewFolderIcon fontSize="medium" color="secondary" />
          </ListItemIcon>
          <ListItemText primary={text} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {submenu.map(child => (
          <Collapse key={child.id} in={isOpen}>
            <Item data={child} />
          </Collapse>
        ))}
      </Layout>
    );
  }

  return (
    <Layout>
      <ListItemButton
        onClick={() => {
          if (link) router.push(link);
        }}
      >
        <ListItemIcon>
          <FolderIcon fontSize="medium" color="primary" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Layout>
  );
}

export default Item;
