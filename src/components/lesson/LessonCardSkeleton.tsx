import { Skeleton } from '@/components/ui/skeleton'

const LessonCardSkeleton = () => {
	return (
		<div className='grid grid-flow-row auto-rows-min gap-4 border border-gray-100 p-4 rounded-md'>
			<Skeleton className='h-12 w-11/12' />
			<Skeleton className='h-4 w-8/12' />
			<Skeleton className='h-3 w-8/12' />
		</div>
	)
}

export { LessonCardSkeleton }
