import React, { memo } from 'react';
import { PopupClass } from '@components/Popup';
import Success from '@assets/success.svg';
import Close from '@assets/close.svg';
import './index.css';

const WaitFluentModal = new PopupClass();
const TransactionSubmittedModal = new PopupClass();

const WaitFluentContent: React.FC = memo(() => {
    return (
        <div className="w-[340px] h-[150px] text-center bg-bg rounded-[8px]">
            <div className="modal-spin mt-[24px]" />
            <p className="font-medium text-[16px] text-text1 mt-[12px] leading-[22px]">Waiting</p>
            <p className="mt-[8px] text-[14px] text-text2 leading-[18px]">Confirm the transaction in your Fluent wallet...</p>
        </div>
    );
});

const TransactionSubmittedContent: React.FC<{ TxnHash: string; action: string; }> = memo(({ TxnHash, action = 'Transaction' }) => {
    return (
        <div className="relative w-[340px] min-h-[192px] p-[24px] text-center bg-bg rounded-lg ">
            <img
                className="absolute right-[12px] top-[12px] w-[16px] h-[16px] cursor-pointer hover:scale-110 transition-transform select-none"
                onClick={TransactionSubmittedModal.hideAll}
                src={Close}
                alt="close icon"
            />

            <img className="w-[48px] h-[48px] mt-[28px] mx-auto" src={Success} alt="success icon" />
            <p className="mt-[12px] font-medium text-[16px] leading-[22px] text-text1 text-center">{action} Submitted</p>
            <p className="mt-[12px] mb-[4px] text-[14px] leading-[18px] text-text1 text-left">Txn Hash:</p>
            <p className="text-[14px] leading-[18px] text-text2 text-left break-words">{TxnHash}</p>
        </div>
    );
});

export const showWaitFluent = () =>
    WaitFluentModal.show({
        Content: <WaitFluentContent />,
        duration: 0,
        showMask: true,
        animationType: 'door',
    });

export const showActionSubmitted = (TxnHash: string, action: string = 'Transaction') => {
    WaitFluentModal.hideAll();
    return TransactionSubmittedModal.show({
        Content: <TransactionSubmittedContent TxnHash={TxnHash} action={action} />,
        duration: 0,
        showMask: true,
        animationType: 'door',
    });
};

export const hideWaitFluent = (key: string | number) => WaitFluentModal.hide(key);
export const hideTransactionSubmitted = (key: string | number) => TransactionSubmittedModal.hide(key);
