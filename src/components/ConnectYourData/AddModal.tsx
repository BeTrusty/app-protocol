// #region IMPORTS

// Types and interfaces
import { type FormEvent } from 'react'

// Components
import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'
import { StateSetter } from '@/types/components'

// Icons


// #region COMPONENT
export function AddModal ({
  red,
  setIsOpen,
  isOpen,
  loginTalentProtocol,
  loginGithub,
  loginMercadoLibre
}: {red:string, 
    setIsOpen: StateSetter<boolean>, 
    isOpen:boolean, 
    loginTalentProtocol:() => void, 
    loginGithub:()=> void,
    loginMercadoLibre:()=> void
}): JSX.Element {
  const onClose: VoidFunction = (): void => {
    setIsOpen(false)
  }

  const handleCancel = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setIsOpen(false)
  }
  const handleAdd = ():void => {
    setIsOpen(false)

    if(red === "Talent Protocol"){
        loginTalentProtocol()
    }
    else if(red === "GitHub") {
        loginGithub()
    }
    else if(red === "Mercado Libre"){
        loginMercadoLibre()
        
    }
    else{
        return
    }
  }

  // #region RETURN
  return (
    <Modal
      closeButton
      backdrop='blur'
      aria-labelledby='cofirm-delete-modal'
      size='lg'
      classNames={{
        base: 'py-5 px-9',
        closeButton: 'text-xl'
      }}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalContent>
        <ModalBody>
          <div className='flex flex-col justify-center items-center gap-8 text-base lg:text-lg cursor-text'>
            <div className='flex justify-center items-center w-full h-full text-orange-600'>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
            <h3 className='font-bold'>¿Querés conectar {red}?</h3>
              <p className='text-start text-base font-normal w-full'>Esto traerá tus datos hacia la plataforma, para generar mas confianza.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-3 w-full mt-5 justify-between'>
            <Button type='button' className='bg-primary w-[150px]' onClick={handleAdd}>Aceptar</Button>
            <Button type='button' className='bg-red-600  w-[150px]' onClick={handleCancel}>Cancelar</Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
