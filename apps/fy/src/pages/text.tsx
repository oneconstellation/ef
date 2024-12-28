import { useForm } from '@oneconstellation/ef';
import cn from 'classnames';

export const TextDemoPage = () => {
  const form = useForm({
    text: [],
  });

  return (
    <div className="flex max-w-full w-full card bg-backgroundSecondary">
      <div className="card-body flex flex-col gap-4 w-full">
        <input
          placeholder="Type here"
          type="text"
          className={cn('input max-w-full', { 'input-error': form.get('text').errors?.email })}
          autoComplete='one-time-code'
          {...form.field('text', { watch: false })}
        />
        <div>
          <h1 className="text-3xl font-semibold mb-3">Output</h1>
          <code className="kbd block whitespace-pre overflow-hidden">{JSON.stringify(form.all, null, 4)}</code>
        </div>
      </div>
    </div>
  )
}