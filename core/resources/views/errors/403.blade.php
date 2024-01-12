<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" media="screen" href="{{asset('assets/front/css/plugins.min.css')}}">

</head>
<body>
    <section class="fourzerofour  pt-4 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="content text-center">
                <h3 class="heading">
                  {{ __('403 | Error') }}
                </h3>
                <p class="text">
                  {{ __('The resource request could not be found on this server !') }}
                </p>
                <a class="mybtn1" href="{{ route('front.index') }}">{{ __('Back Home') }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
</body>
</html>



