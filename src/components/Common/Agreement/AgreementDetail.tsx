import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  handleClose: any;
  links: Array<LinksProps>;
}

export interface LinksProps {
  link: string;
  height: number | string;
}

const Layout = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border: 1px solid;
  background-color: #ffffff;

  button {
    position: absolute;
    top: 10px;
    right: 8px;
  }

  .wrap {
    overflow-y: scroll;
    min-width: 360px;
    height: 100%;
  }
`;

function AgreementDetail({ handleClose, links }: Props) {
  return (
    <Layout>
      <button type="button" onClick={handleClose}>
        <CloseIcon />
      </button>
      <div className="wrap">
        {links.map(({ link, height }) => (
          // eslint-disable-next-line jsx-a11y/iframe-has-title
          <iframe key={link} src={link} width="100%" height={height} />
        ))}
      </div>
    </Layout>
  );
}

export default AgreementDetail;
