declare module 'react-easy-edit' {
    import React from 'react';

    export enum Types {
      TEXT = 'text',
      // Add other types if needed
    }

  
    interface EasyEditProps {
      type: Types
      value?: string | number | []
      options?: []
      saveButtonLabel?: string | React.ReactElement
      saveButtonStyle?: string
      cancelButtonLabel?: string | React.ReactElement
      cancelButtonStyle?: string
      deleteButtonLabel?: string | React.ReactElement 
      buttonsPosition?: string
      placeholder?: string
      onCancel?: () => void
      onSave: (value) => void
      onValidate?: () => void
      onFocus?: () => void
      onBlur?: () => void
      validationMessage?: string
      allowEdit?: boolean
      attributes?: {}
      viewAttributes?: {}
      instructions?: string
      disableAutoSubmit?: boolean
      disableAutoCancel?: boolean
      editComponent?: React.ReactElement 
      displayComponent?: React.ReactElement 
      cssClassPrefix?: string
      hideSaveButton?: boolean
      hideCancelButton?: boolean
      hideDeleteButton?: boolean
      saveOnBlur?: boolean
      cancelOnBlur?: boolean
      editMode?: boolean
    }
  
    const EastEdit: React.FC<EasyEditProps>;
  
    // Export other components or types as needed
  
    export default EastEdit;
  }
  