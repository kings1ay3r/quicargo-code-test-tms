import truckManagement from '@app/server/handlers/truckManagement'
import locationManagement from '@app/server/handlers/locationManagement'

export default { ...truckManagement, ...locationManagement }
