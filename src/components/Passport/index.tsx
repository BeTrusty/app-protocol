import {
  CredentialSubject,
  DisplayProperty,
  type CredentialData
} from '@/types/credentials'
import {
  Card,
  CardFooter,
  Image,
  CardHeader,
  Chip,
  CardBody,
  AccordionItem,
  Accordion
} from '@nextui-org/react'
import { LogoMercadoLibre } from '@components/icons/IconMercadoLibre'
import { LogoGithub } from '@components/icons/IconGithub'
import { timeSince } from '@/utils/timeSince'

const DynamicInfo = ({
  data,
  properties
}: {
  data: CredentialSubject
  properties: DisplayProperty[]
}) => {
  const getValueByPath = (obj: CredentialSubject, path: any[]) => {
    return path.reduce((acc, key) => {
      // Elimina el prefijo '$.' del path
      return acc && acc[key] !== undefined ? acc[key] : undefined
    }, obj)
  }

  const cleanLabel = (label: string) => {
    return label
      .replace(/\s?\|\s?\(Github\)/i, '')
      .replace(/\s?\|\s?\(Mercado Libre\)/i, '')
  }

  return (
    <div>
      {properties.map((property, index) => {
        const path = property.path[0]
          .replace('$.credentialSubject.', '')
          .split('.')
        const value = getValueByPath(data, path) || property.fallback
        const label = cleanLabel(property.label)

        return (
          <div
            key={index}
            className='flex flex-row justify-between items-center gap-8 w-full p-2 text-wrap'
          >
            <p className='font-semibold text-start text-gray-900 text-wrap truncate min-w-fit'>
              {label}:
            </p>
            <p className='text-end text-gray-700 text-wrap truncate'>{value}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DynamicInfo

export function Passport ({
  credential
}: {
  credential: CredentialData
}): JSX.Element {
  const title = credential.outputDescriptor.display.title.text
  const subtitle = credential.outputDescriptor.display.subtitle.text
  const description = credential.outputDescriptor.display.description.text
  const img = credential.issuer.styles.hero.uri
  const alt = credential.issuer.styles.hero.alt
  const level = credential.vc.credentialSubject.reputation_level
  const createdAt = Number(credential.vc.credentialSubject.created_at)
  const data = credential.vc.credentialSubject
  const properties = credential.outputDescriptor.display.properties
  const mercadoLibreProperties = properties.filter(property =>
    property.label.includes('| (Mercado Libre)')
  )
  const mercadoLibre = Object.fromEntries(
    Object.entries(data).filter(([key, value]) =>
      key.startsWith('mercado_libre')
    )
  ) as CredentialSubject
  const githubProperties = properties.filter(property =>
    property.label.includes('| (Github)')
  )
  const github = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => key.startsWith('github'))
  ) as CredentialSubject

  return (
    <Card
      isFooterBlurred
      radius='lg'
      classNames={{
        base: 'border-none before:bg-white/10 border-white/10 border-1 shadow-xl flex flex-col justify-center items-center max-w-[400px] w-full pb-6',
        body: 'justify-between overflow-hidden absolute before:rounded-xl rounded-large top-32 w-[calc(100%_-_36px)] z-10 py-2',
        footer: 'px-6 flex flex-col justify-center items-center gap-4'
      }}
    >
      <Image
        src={img}
        alt={alt}
        className='object-cover'
        height={180}
        width={400}
      />
      <CardHeader className='absolute top-0 left-0 min-w-full p-5'>
        <div className='flex items-center justify-between mb-4 w-full'>
          <div className='flex flex-row justify-start items-center gap-3 space-x-2'>
            <div className='flex flex-col justify-center items-center min-w-[50px] min-h-[50px] rounded-full bg-dark'>
              <Image
                src={credential.issuer.styles.thumbnail.uri}
                alt={credential.issuer.styles.hero.alt}
                width={30}
                height={30}
                className='object-contain object-center border-none rounded-none'
              />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>{title}</h2>
              <p className='text-sm text-gray-200'>{subtitle}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row justify-between items-center gap-2'>
            <span className='text-gray-800 font-medium'>Created At:</span>
            <span className='text-gray-800'>{timeSince(createdAt)}</span>
          </div>
          <Chip>{level}</Chip>
        </div>
      </CardBody>
      <CardFooter>
        <Accordion selectionMode='multiple' className='max-w-full'>
          <AccordionItem
            key='1'
            aria-label='Mercado Libre'
            startContent={<LogoMercadoLibre width='45px' />}
            title='Mercado Libre'
            classNames={{
              base: 'max-w-full'
            }}
          >
            <DynamicInfo
              data={mercadoLibre}
              properties={mercadoLibreProperties}
            />
          </AccordionItem>
          <AccordionItem
            key='2'
            aria-label='Github'
            startContent={<LogoGithub width='40px' />}
            title='Github'
            classNames={{
              base: 'max-w-full'
            }}
          >
            <DynamicInfo data={github} properties={githubProperties} />
          </AccordionItem>
        </Accordion>
        <div className='flex flex-col justify-start items-start gap-1 mt-2 mx-2'>
          <h2 className='text-lg text-gray-900 font-semibold'>Descripción:</h2>
          <p className='text-start text-gray-700'>{description}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
