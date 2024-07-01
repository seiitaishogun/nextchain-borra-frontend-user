const userRegex = /\$user_name/g;
const partnerRegex = /\$partner_name/g;
const daeunsuRegex1 = /\$d/g;
const daeunsuRegex2 = /\$d_1/g;
const manNameRegex = /\$man_name/g;
const womanNameRegex = /\$woman_name/g;

const fortuneTextReplace = ({
  text,
  userName,
  partnerName,
  daeunsu,
  manName,
  womanName,
}: {
  text: string;
  userName: string;
  partnerName: string;
  daeunsu: number | string;
  manName: string;
  womanName: string;
}) => {
  if (!text) return '';

  const daeunsu2 = daeunsu === 0 ? '9' : (Number(daeunsu) - 1).toString();
  return stringNullReplace(text)
    .replace(userRegex, userName)
    .replace(partnerRegex, partnerName)
    .replace(daeunsuRegex2, daeunsu2)
    .replace(daeunsuRegex1, daeunsu.toString())
    .replace(manNameRegex, manName)
    .replace(womanNameRegex, womanName);
};

const stringNullReplace = (name: string) => {
  if (name === 'null') return '';
  return name;
};

export { fortuneTextReplace, stringNullReplace };
