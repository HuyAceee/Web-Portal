import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface RouterLinkProps {
    href: string
    [key: string]: any
}

const RouterLink = forwardRef(({ href, ...other }: RouterLinkProps, ref: any) => <Link ref={ref} to={href} {...other} />);

export default RouterLink;
