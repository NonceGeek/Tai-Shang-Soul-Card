defmodule CodesOnChain.SpeedRunFetcher do
  alias Components.ExHttp

  def fetch_data(addr, speedrun_api_endpoint, speedrun_url) do
    {:ok, data} = ExHttp.http_get(speedrun_api_endpoint)

    runner =
      data
      |> Enum.find(fn %{"id" => id} ->
        id == addr
      end)

    role = Map.get(runner, "role")

    accepted_challengues =
      runner
      |> Map.get("challenges", %{})
      |> Map.to_list()
      |> Enum.filter(fn {_name, challenge} ->
        Map.get(challenge, "status") == "ACCEPTED"
      end)

    len = length(accepted_challengues)

    %{
      chanllege_passed_num: len,
      link: "#{speedrun_url}#{role}s/#{addr}",
      level: if(len == 0, do: 0, else: fib(len))
    }
  end

  defp fib(0), do: 1
  defp fib(1), do: 1
  defp fib(n), do: fib(n - 1) + fib(n - 2)
end
