import * as React from 'react';
import { ConversationList } from '../../../../components/ConversationsList/ConversationList';
import { SideBar } from '../../../../components/SideBar/SideBar';
import { Conversation } from '../../../../components/Conversation/Conversation';
import {
  BoxChatStyled,
  BoxChatWrapperStyled,
  BoxChatHeaderStyled,
  BoxChatConversationStyled,
  BoxChatConversationListStyled,
} from './stylesChat';

export const Chat: React.FC = () => (
  <BoxChatStyled>
    <SideBar />
    <BoxChatWrapperStyled>
      <BoxChatHeaderStyled />
      <BoxChatConversationStyled>
        <BoxChatConversationListStyled>
          <ConversationList />
        </BoxChatConversationListStyled>
        <Conversation />
      </BoxChatConversationStyled>
    </BoxChatWrapperStyled>
  </BoxChatStyled>
);
