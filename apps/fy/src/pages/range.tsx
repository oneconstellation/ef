import { useForm } from '@oneconstellation/ef';

export const RangeDemoPage = () => {
  const form = useForm({
    range: [],
    watchedRange: [],
  });

  const getValue = () => {
    console.log(form.get('range').valueByRef());
  };

  return (
    <div className="flex max-w-full w-full card bg-backgroundSecondary">
      <div className="card-body flex flex-col w-full">
        <form {...form.form}>
          <div>
            <h1 className="text-3xl font-semibold mb-3">Value on demand</h1>
            <div className="card">
              <div className="card-body">
                <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                  <div className="form-group">
                    <div className="form-field">
                      <div className="form-control">
                        <input
                          type="range"
                          className="range range-flat-primary"
                          {...form.field('range', { watch: false })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={() => getValue()}>
                    get value
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6">
            <h1 className="text-3xl font-semibold mb-3">Watch changes</h1>
            <div className="card">
              <div className="card-body">
                <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                  <div className="form-group">
                    <div className="form-field">
                      <div className="form-control">
                        <input
                          type="range"
                          className="range range-flat-primary"
                          {...form.field('watchedRange', { watch: true })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          <h1 className="text-3xl font-semibold mb-3">Output</h1>
          <code className="kbd block whitespace-pre overflow-hidden">{JSON.stringify(form.all, null, 4)}</code>
        </div>
      </div>
    </div>
  );
};
