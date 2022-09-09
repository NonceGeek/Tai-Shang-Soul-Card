import styles from './index.less';
import WhiteBorderButton from '@/components/WhiteBorderButton';

import LogoImg from '@/assets/img/logo.png'

export default function IndexPage() {
  return (
    <div className='page w-full min-h-screen bg-black'>
      <div className="content w-main mx-auto flex flex-col">
        <img className='w-12 h-12' src={LogoImg} alt="logo" />
        <span className='text-white font-Audiowide'>SoulCard</span>
        <WhiteBorderButton />
        <h1 className={styles.title}>Page index</h1>
        <p className="text-red-500">landing page</p>
      </div>
    </div>
  );
}
