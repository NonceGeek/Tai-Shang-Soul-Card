import React, { useState, useEffect } from 'react';
import GradientFont from '@/components/GradientFont';
import GradientLine from '@/components/GradientLine';
import IEdit from '@/components/IEdit';
import OEdit from '@/components/OEdit';
export default function index(props) {
  const [individual_info, set_individual_info] = useState({});
  const [organization_info, set_organization_info] = useState({});
  const [current_edit, set_current_edit] = useState('individual');
  useEffect(() => {
    console.log(current_edit);
  }, [current_edit]);

  const handle = (val) => {
    props.updateForm({
      mode: current_edit,
      data: val
    })
  }
  return (
    <div className="flex flex-col font-IBMPlexMono">
      <GradientFont text="Hi," style={{ fontSize: '80px' }}></GradientFont>
      <p className=" text-white text-[24px]">
        Let’s talk something about yourself.
      </p>
      <p className="relative text-[16px] mb-2">
        Sign up individually or as a organization
        <span className="ml-1 bg-gradient-to-r from-xc2-a to-xc2-b bg-clip-text text-transparent text-[1px] absolute top-0">
          *
        </span>
      </p>
      <div className="right flex items-center gap-x-8 text-[20px] cursor-default">
        <span
          className="text-white"
          onClick={() => set_current_edit('individual')}
        >
          Individual
          {current_edit === 'individual' ? (
            <span className="relative top-[-20px]">
              <GradientLine></GradientLine>
            </span>
          ) : (
            <span className="inline-block w-full"></span>
          )}
        </span>

        <span
          className="text-white"
          onClick={() => set_current_edit('organization')}
        >
          Organization
          {current_edit === 'organization' ? (
            <span className="relative top-[-20px]">
              <GradientLine></GradientLine>
            </span>
          ) : (
            <span className="inline-block w-full"></span>
          )}
        </span>
      </div>
      {current_edit === 'individual' ? <IEdit handleData={handle}></IEdit> : <OEdit handleData={handle}></OEdit>}
    </div>
  );
}
