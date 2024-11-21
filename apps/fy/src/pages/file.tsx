import { useForm } from '@oneconstellation/ef';

export const FileDemoPage = () => {
  const form = useForm(
    {
      avatar: [],
    },
    {
      onSubmit(values) {
        console.log(values);
      },
    }
  );

  return (
    <div className="flex max-w-full w-full card bg-backgroundSecondary">
      <div className="card-body flex flex-col gap-4 w-full">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Demo</h1>
          <div className="card">
            <div className="card-body">
              <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                <form className="form-group" {...form.form}>
                  <div className="form-field">
                    <label className="form-label">Photo</label>
                    <div className="form-control">
                      <input className="input-file" multiple {...form.file('avatar', { watch: false })} />
                    </div>
                  </div>
                  <div className="form-field pt-5">
                    <div className="form-control justify-between">
                      <input type="submit" className="btn btn-primary w-full" value={'Upload'} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-3">Output</h1>
          <code className="kbd block whitespace-pre overflow-hidden">{JSON.stringify(form.all, null, 4)}</code>
        </div>
      </div>
    </div>
  );
};
