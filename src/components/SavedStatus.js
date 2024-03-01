import React from 'react';
import { VscSync } from 'react-icons/vsc';
import Moment from 'react-moment';

function SaveStatus({ savedTime }) {
  const [saveInProgress, setSaveInProgress] = React.useState(false);

  React.useEffect(() => {
    if (!savedTime) return;
    setSaveInProgress(true);
    setTimeout(() => {
      setSaveInProgress(false);
    }, 750);
  }, [savedTime]);

  if (saveInProgress) {
    return (
      <div className="flex items-center text-xs text-gray-500">
        <VscSync className="font-bold" /> Saving...
      </div>
    );
  } else if (savedTime) {
    return (
      <div className="text-xs text-gray-500">
        Saved{' '}
        <Moment fromNow ago>
          {savedTime}
        </Moment>{' '}
        ago
      </div>
    );
  }
  return null;
}

export default SaveStatus;
